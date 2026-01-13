from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    RegisterView,
    TaskViewSet,
    login_view,
    profile_view,
    update_profile_view,   
)


router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='tasks')

urlpatterns = [
 
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('profile/', profile_view, name='profile'),
    path('', include(router.urls)),
    path('profile/update/', update_profile_view, name='update-profile'),

]
