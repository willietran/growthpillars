from django.contrib import admin

# Register your models here.
from growthpillarsapp.models import User, Comment, Post, Vote

admin.site.register(User)
admin.site.register(Comment)
admin.site.register(Post)
admin.site.register(Vote)
