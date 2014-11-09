from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    image = models.ImageField(upload_to='user_img', null=True)

    def __unicode__(self):
        return "{}".format(self.username)

class Post(models.Model):
    user = models.ForeignKey(User, related_name='post_users')
    title = models.CharField(max_length=80)
    place = models.CharField(max_length=15)
    idea = models.CharField(max_length=140)
    link = models.CharField(max_length=140)
    labor = models.IntegerField()
    audience = models.CharField(max_length=20)
    result = models.CharField(max_length=20)
    spend = models.IntegerField()
    story = models.TextField()

    def __unicode__(self):
        return "{}".format(self.title)

class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comment_users')
    post = models.ForeignKey(Post, related_name='comment_posts')
    content = models.CharField(max_length=1000)

    def __unicode__(self):
        return "Comment on {} from {}".format(self.post.title, self.user.username)


class Vote(models.Model):
    user = models.ForeignKey(User, related_name='vote_users')
    post = models.ForeignKey(Post, related_name='vote_post')

    def __unicode__(self):
        return "Upvote for {} from {}".format(self.post.title, self.user.username)