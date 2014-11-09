from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'growthpillarsapp.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),

    # User creation and administration
    url(r'^register/$', 'growthpillarsapp.views.register', name='register'),
    url(r'^login/$', 'django.contrib.auth.views.login', name='login'),

    # Create Post
    url(r'^post/$', 'growthpillarsapp.views.post', name='post'),

    # View Post
    url(r'^view/(?P<post_id>[0-9]+)/$', 'growthpillarsapp.views.view', name='view')

    # Blog
    # url(r'^blog/', include('blog.urls')),
)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
