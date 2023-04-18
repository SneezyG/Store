from django.urls import path
from store.views import Index, Panel, Report, Update, Return, Error, Welcome, Test
from django.contrib.auth.decorators import login_required


urlpatterns = [

  path('', Index, name='index'),
  path('test/', Test, name='test'),
  path('error/', Error, name='Error'),
  path('welcome/', login_required(Welcome), name='welcome'),
  path('panel/', login_required(Panel), name='panel'),
  path('report/', login_required(Report), name='report'),
  path('update/', login_required(Update.as_view()), name='update'),
  path('return/', login_required(Return.as_view()), name='return'),
  
]