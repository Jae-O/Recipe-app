import pprint
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
import pandas as pd

filePath = 'user2.json'

data = []
with open(filePath, 'r') as file:
    data = json.load(file)

def getPRF(data, type, username):
    data = [user for user in data['user']]
    prf = []
    if type == 'rating':
        prf = {}
        for user in data:
            if username in user:
                userprf = user[username].get(type, {})
                prf.update(userprf)
        return prf
    else:
        for user in data:
            if username in user:
                userprf = user[username].get(type, [])
                prf.extend(userprf)
        return prf

def getDocs(data, type):
    data = [user for user in data['user']]

    docs = []
    for user in data:
        id = list(user.keys())[0]
        types = user[id][type]
        docs.append(types)

    return docs

#pandas
#data = pd.DataFrame(data['recipe'])
#hashTag = data['hashTag']

#pprint.pprint(data)

#recipe2
#hashTag = [recipe['hashTag'] for recipe in data['recipe']]
#score = [recipe['score'] for recipe in data['recipe']]
#pprint.pprint(hashTag)
#print(score)

#user2
username = input('user name: ')
userlike = getPRF(data, 'like', username)
userview = getPRF(data, 'view', username)
userrating = getPRF(data, 'rating', username)
print('like: ', userlike)
print('view: ', userview)
print('rating: ', userrating)

print('get likes: ')
#pprint.pprint(getDocs(data, 'like'))


def get_user_likes(data, user_id):
    # 사용자의 좋아요 목록 반환
    for user in data:
        if user_id in user:
            return user[user_id]['like']
    return []

def calculate_cosine_similarity(data, user1_id, user2_id):
    # 사용자 1의 좋아요 목록
    user1_likes = get_user_likes(data, user1_id)
    if not user1_likes:
        return 0.0

    # 사용자 2의 좋아요 목록
    user2_likes = get_user_likes(data, user2_id)
    if not user2_likes:
        return 0.0

    # 두 사용자의 좋아요 목록을 이진 벡터로 변환
    all_likes = list(set(user1_likes + user2_likes))
    user1_vector = [1 if like in user1_likes else 0 for like in all_likes]
    user2_vector = [1 if like in user2_likes else 0 for like in all_likes]

    # 코사인 유사도 계산
    similarity = cosine_similarity([user1_vector], [user2_vector])[0][0]
    return similarity

# 유저 간의 유사도 행렬 생성
formatted_data = [user for user in data['user']]
users =[]
for user in formatted_data:
    users.append(list(user.keys())[0])
print(users)
similarity_matrix = np.zeros((len(users), len(users)))
for i in range(len(users)):
    for j in range(len(users)):
        similarity_matrix[i][j] = calculate_cosine_similarity(formatted_data, users[i], users[j])

# 히트맵으로 유사도 행렬 시각화
plt.figure(figsize=(8, 6))
plt.imshow(similarity_matrix, cmap='hot', interpolation='nearest')
plt.colorbar(label='Similarity')
plt.xticks(np.arange(len(users)), users, rotation=45)
plt.yticks(np.arange(len(users)), users)
plt.title('User Similarity Matrix')
plt.xlabel('User')
plt.ylabel('User')
plt.show()




