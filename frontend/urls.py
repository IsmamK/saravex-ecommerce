# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # General view for all products
    path('category/<str:category_name>/', views.products_view, name='category_products'),  # Filtered by category name
]
