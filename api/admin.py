from django.contrib import admin
from .models import *

def duplicate_model_instance(modeladmin, request, queryset):
    for obj in queryset:
        # Create a copy of the object
        obj.pk = None
        obj.save()
duplicate_model_instance.short_description = 'Duplicate selected %(verbose_name_plural)s'

class ProductAdmin(admin.ModelAdmin):
    actions = [duplicate_model_instance]


# Register your models here.



admin.site.register(Product, ProductAdmin)
admin.site.register(Category)