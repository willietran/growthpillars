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
    url(r'^logout/$', 'django.contrib.auth.views.logout',
        {'next_page': '/'}, name='logout'),

    # Password Reset
    url(r'^password_reset/$', 'django.contrib.auth.views.password_reset',
        name='password_reset'),
    url(r'^password_reset/done/$',
        'django.contrib.auth.views.password_reset_done',
        name='password_reset_done'),
    url(r'^reset/done/$', 'django.contrib.auth.views.password_reset_complete',
        name='password_reset_complete'),

    # Create Post
    url(r'^post/$', 'growthpillarsapp.views.post', name='post'),
    url(r'^post_submit/$', 'growthpillarsapp.views.post_submit',
        name='post_submit'),

    # View Post
    url(r'^view/(?P<post_id>[0-9]+)/$', 'growthpillarsapp.views.view',
        name='view'),

    # Vote Post
    url(r'^vote/(?P<post_id>[0-9]+)/$', 'growthpillarsapp.views.vote',
        name='vote'),

    # Blog
    # url(r'^blog/', include('blog.urls')),
)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
