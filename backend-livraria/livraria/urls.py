from rest_framework.routers import DefaultRouter
from .views import BookViewSet, CartViewSet, OrderViewSet

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = router.urls
