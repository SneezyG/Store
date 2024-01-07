from django.urls import path
from store.views import Index, Panel, Report, Update, Return, Welcome, GetItem, ProcessTransaction
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
  path('', Index, name='index'),
  path('welcome/', login_required(Welcome), name='welcome'),
  path('panel/', login_required(Panel), name='panel'),
  path('item/', login_required(GetItem), name='item'),
  path('processTransaction/', login_required(ProcessTransaction), name='processTransaction'),
  path('report/', login_required(Report), name='report'),
  path('update/', login_required(Update.as_view()), name='update'),
  path('return/', login_required(Return.as_view()), name='return'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)