from django.shortcuts import render,redirect
from django.conf import settings
from api.models import *
import requests
from django.shortcuts import render, redirect, get_object_or_404
from django.core.files.storage import default_storage

# Create your views here.



# ---------------------------------- CATEGORIES --------------------------------------------

#Get categories
def get_categories():
    get_categories_url = f'{settings.API_URL}/categories/'
    return sorted(requests.get(get_categories_url, timeout=10).json(), key=lambda x: x['priority'])

#Category View
def categories(request):
    get_categories = f'{settings.API_URL}/categories/'
    categories = sorted(requests.get(get_categories,timeout=10).json(),key = lambda x:x['priority'])
    print(categories)
    return render(request,"categories.html", {
        'categories':categories,
    })

#Add Category
def add_category(request):
    if request.method == "POST":
        name = request.POST.get('name')
        priority = request.POST.get('priority')

        # Send a POST request to the API to create a new category
        post_category = f'{settings.API_URL}/categories/'
        data = {
            'name': name,
            'priority': priority,
        }
        response = requests.post(post_category, json=data, timeout=10)
        if response.status_code == 201:  # Successfully created
            return redirect('categories')  # Redirect to categories page
        else:
            # Handle errors if needed
            return render(request, "add-category.html", {
                'error': 'Failed to create category.'
            })

    return render(request,"add-category.html")

#Edit Category
def edit_category(request, id):
    if request.method == "POST":
        name = request.POST.get('name')
        priority = request.POST.get('priority')

        # Send a PUT request to the API to update the category
        update_category = f'{settings.API_URL}/categories/{id}/'
        data = {
            'name': name,
            'priority': priority,
        }
        response = requests.put(update_category, json=data, timeout=10)
        if response.status_code == 200:  # Successfully updated
            return redirect('categories')  # Redirect to categories page
        else:
            # Handle errors if needed
            return render(request, "edit-category.html", {
                'category': requests.get(f'{settings.API_URL}/categories/{id}', timeout=10).json(),
                'error': 'Failed to update category.'
            })

    else:
        get_category = f'{settings.API_URL}/categories/{id}'
        category = requests.get(get_category, timeout=10).json()
        return render(request, "edit-category.html", {
            'category': category
        })

#Delete Category    
def delete_category(request, id):
    if request.method == "POST":
        delete_category_url = f'{settings.API_URL}/categories/{id}/'
        response = requests.delete(delete_category_url, timeout=10)
        if response.status_code == 204:  # Successfully deleted
            return redirect('categories')  # Redirect to categories page
        else:
            return render(request, "categories.html", {
                'error': 'Failed to delete category.',
                'categories': get_categories()  # Reload categories in case of an error
            })
    else:
        return redirect('categories')



# ---------------------------------- PRODUCTS --------------------------------------------

def get_products():
    get_products_url = f'{settings.API_URL}/products/'
    return requests.get(get_products_url, timeout=10).json()

def products(request):
    get_products = f'{settings.API_URL}/products/'
    products = requests.get(get_products,timeout=10).json()

    return render(request,"products.html",{
        'products':products,
    })

def add_product(request):
    if request.method == "POST":
        # Fetch form data
        name = request.POST.get('name', '').strip()
        price = request.POST.get('price', '').strip()
        stock_status = request.POST.get('stock_status', '').strip()
        category_id = request.POST.get('category', '').strip()
        description = request.POST.get('description', '').strip()
        image = request.FILES.get('image')

        # Validate the inputs
        errors = []
        if not name:
            errors.append("Product name is required.")
        if not price:
            errors.append("Product price is required.")
        else:
            try:
                price = float(price)
                if price < 0:
                    errors.append("Product price cannot be negative.")
            except ValueError:
                errors.append("Product price must be a valid number.")
        if not stock_status:
            errors.append("Stock status is required.")
        elif stock_status not in ['in_stock', 'out_of_stock']:
            errors.append("Invalid stock status.")
        if not category_id:
            errors.append("Product category is required.")
        else:
            try:
                category_id = int(category_id)
            except ValueError:
                errors.append("Invalid category ID.")
        if not image:
            errors.append("Product image is required.")

        # If there are validation errors, re-render the form with errors
        if errors:
            return render(request, "add-products.html", {
                'error': ' '.join(errors),
                'categories': get_categories(),  # Include categories to repopulate the form
            })

  

        # Prepare the data for the POST request
        data = {
            'name': name,
            'price': price,
            'stock_status': stock_status,
            'category': category_id,
            'description': description,
        }

        # Files need to be handled separately
        files = {'image': image}

        # Send a POST request to the API to create a new product
        post_product_url = f'{settings.API_URL}/products/'
        response = requests.post(post_product_url, data=data, files=files, timeout=10)

        if response.status_code == 201:  # Successfully created
            return redirect('products')  # Redirect to a product listing page or dashboard
        else:
            # Handle errors if needed
            print(response.json())
            return render(request, "add-products.html", {
                'error': 'Failed to create product.',
                'categories': get_categories(),  # Include categories to repopulate the form
            })

    # On GET request, just render the form
    return render(request, "add-products.html", {
        'categories': get_categories(),  # Pass categories to the template
    })



def edit_product(request, id):
    product = get_object_or_404(Product, pk=id)
    categories = Category.objects.all()
    
    if request.method == 'POST':
        name = request.POST.get('name')
        price = request.POST.get('price')
        stock_status = request.POST.get('stock_status')
        category_id = request.POST.get('category')
        description = request.POST.get('description')
        
        # Handle image upload
        image = request.FILES.get('image')
        if image:
            product.image = image

        product.name = name
        product.price = price
        product.stock_status = stock_status
        product.category_id = category_id
        product.description = description
        product.save()

        return redirect('products')  # Redirect to a product list or another appropriate page
    
    return render(request, "edit-product.html", {
        'product': product,
        'categories': categories
    })


#Delete Product    
def delete_product(request, id):
    if request.method == "POST":
        delete_product_url = f'{settings.API_URL}/products/{id}/'
        response = requests.delete(delete_product_url, timeout=10)
        if response.status_code == 204:  # Successfully deleted
            return redirect('products')  # Redirect to product page
        else:
            return render(request, "products.html", {
                'error': 'Failed to delete product.',
                'products': get_products() ,
                'categories': get_categories()  # Reload categories in case of an error
            })
    else:
        return redirect('categories')