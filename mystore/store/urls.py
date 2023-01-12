from django.urls import path
from store.views import Index, Panel, Report, Update, Return, Error
from django.contrib.auth.decorators import login_required


urlpatterns = [

  path('', Index, name='index'),
  path('error', Error, name='Error'),
  path('panel/', login_required(Panel), name='panel'),
  path('report/', login_required(Report), name='report'),
  path('update/', login_required(Update.as_view()), name='update'),
  path('return/', login_required(Return.as_view()), name='return'),
  
]