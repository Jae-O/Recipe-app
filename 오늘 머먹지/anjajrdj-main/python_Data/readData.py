import pprint
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# Firebase 프로젝트의 인증 정보를 가져옴
cred = credentials.Certificate("./anjajrdj.json")

# 인증 정보를 사용하여 Firebase 앱 초기화
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://anjajrdj-c7a3d-default-rtdb.firebaseio.com/'
})

# 데이터베이스 레퍼런스 가져오기
ref = db.reference('/recipe')

# 기존 데이터 가져오기
data = ref.get()

print(type(data))
pprint.pprint(data)

# 비어있는 필드에 새로운 필드 추가
#data["newField"] = "value"
# 데이터 업데이트
#ref.set(data)

print("done.")