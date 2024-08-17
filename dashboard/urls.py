from django.urls import path, include
from . import views


urlpatterns = [

    path('', views.categories, name='dashboard'), 
    #Category endpoints
    path('categories', views.categories, name='categories'), 
    path('categories/add', views.add_category, name='add-category'), 
    path('categories/edit/<int:id>', views.edit_category, name='edit-category'), 
    path('categories/delete/<int:id>', views.delete_category, name='delete-category'),


     # Product Endpoints
    path('products', views.products, name='products'),  
    path('products/add', views.add_product, name='add-product'),  
    path('products/edit/<int:id>', views.edit_product, name='edit-product'),  
    path('products/delete/<int:id>', views.delete_product, name='delete-product'),


    path('orders', views.categories, name='orders'),  
]