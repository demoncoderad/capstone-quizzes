from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .forms import UserChangeForm, UserCreationForm
from .models import User

class UserAdmin(UserAdmin):    
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ['email']
    
admin.site.register(User, UserAdmin)