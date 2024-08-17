# views.py
from django.core.paginator import Paginator
from django.shortcuts import render
import requests
import logging
from django.conf import settings



def index(request):
    return products_view(request, category_name=None)

def products_view(request, category_name):
    get_products = f'{settings.API_URL}/products/'
    get_categories = f'{settings.API_URL}/categories/'

    try:
        response_products = requests.get(get_products, timeout=10)
        response_products.raise_for_status()
        products = response_products.json()
    except requests.RequestException as e:
        logging.error(f"An error occurred while fetching products: {e}")
        products = []

    try:
        response_categories = requests.get(get_categories, timeout=10)
        response_categories.raise_for_status()
        categories = sorted(response_categories.json(),key=lambda x:x['priority'])
    except requests.RequestException as e:
        logging.error(f"An error occurred while fetching categories: {e}")
        categories = []

    if category_name:
        products = [p for p in products if p.get('category', {}).get('name') == category_name]

    formatted_products = []
    for product in products:
        formatted_products.append({
            "image": product.get('image', '/static/images/placeholder.png'),
            "name": product.get("name", "Unnamed Product"),
            "category": product.get("category", {}).get("name", "Uncategorized"),
            "status": "In Stock" if product.get("stock_status") == "in_stock" else "Out of Stock",
            "sold": product.get("sold", 0),
            "price": f"${product.get('price', 'N/A')}"
        })

    formatted_categories = []
    for category in categories:
        formatted_categories.append({
            "name": category.get("name"),
            "product_count": category.get("product_count", 0)
        })

    paginator = Paginator(formatted_products, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    category_title = 'All Products' if not category_name else category_name

    return render(request, "index.html", {
        "products": page_obj,
        "categories": formatted_categories,
        "paginator": paginator,
        "page_obj": page_obj,
        "category_title": category_title
    })
