import json
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from growthpillarsapp.forms import NewUserCreationForm, PostForm
from growthpillarsapp.models import Post, Vote


def home(request):
    posts = Post.objects.all()
    data = {'posts':posts}
    return render(request, 'base.html', data)


# View to create a new account
def register(request):
    if request.method == 'POST':
        form = NewUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            form.image = request.FILES['image']
            form.save()
            return redirect("home")
    else:
        form = NewUserCreationForm()

    return render(request, "registration/register.html", {
        'form': form,
    })


# View to create a new Post
@login_required
def post_submit(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        print 'post req received'
        print form
        if form.is_valid():
            user = request.user
            title = form.cleaned_data['title']
            place = form.cleaned_data['place']
            idea = form.cleaned_data['idea']
            link = form.cleaned_data['link']
            labor = form.cleaned_data['labor']
            audience = form.cleaned_data['audience']
            result = form.cleaned_data['result']
            spend = form.cleaned_data['spend']
            story = form.cleaned_data['story']
            Post.objects.create(user=user, title=title, place=place, idea=idea, link=link, labor=labor, audience=audience,
                            result=result, spend=spend, story=story)
            return HttpResponse(status=200)
        else:
            print 'invalid form'
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

def post(request):
    return render(request, 'post.html')


def view(request, post_id):
    post = Post.objects.get(id=post_id)
    post_data = {'post_data':post}

    return render(request, 'view.html', post_data)


def vote(request, post_id):
    post = Post.objects.get(id=post_id)
    post_data = {'post_data':post}

    Vote.objects.create(user=request.user, post=post_id)

    return render(request, 'view.html', post_data)