from django.contrib import admin
from .models import User, Book, Cart, CartItem, Order, OrderItem
from django.contrib.auth.admin import UserAdmin

# Registrando o modelo User personalizado
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'first_name', 'last_name', 'is_staff', 'is_active']
    ordering = ['email']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_active'),
        }),
    )

admin.site.register(User, CustomUserAdmin)

# Registrando o modelo Book
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'categories')
    search_fields = ('title', 'author')
    ordering = ('title',)

# Registrando o modelo Cart
@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    search_fields = ('user__email',)
    ordering = ('created_at',)

# Registrando o modelo CartItem
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'book', 'quantity')
    search_fields = ('book__title',)
    ordering = ('cart',)

# Registrando o modelo Order
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'total', 'created_at')
    search_fields = ('user__email',)
    ordering = ('created_at',)

# Registrando o modelo OrderItem
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('order', 'book', 'quantity', 'price')
    search_fields = ('order__user__email', 'book__title')
    ordering = ('order',)
