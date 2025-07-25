import pprint
import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt
import firebase_admin
from firebase_admin import credentials

data = []
with open('../RCMD/user2.json', 'r') as file:
    data = json.load(file)

RData = []
with open('../RCMD/recipe3.json', 'r') as file:
    RData = json.load(file)

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
        return list(map(str, prf))

def parse_hashTag_element(recipe_data, indices, element):
    parsed_values = []
    for index in indices:
        for recipe in recipe_data:
            if recipe['index'] == index:
                hash_tags = recipe['hashTag']
                parsed_value = hash_tags.get(element, None)
                parsed_values.append(parsed_value)
                break
        else:
            parsed_values.append(None)
    return parsed_values

def ratingPRF(dictionary, values):
    result = []
    for key in dictionary.keys():
        if dictionary[key] in values:
            result.extend(eval(key))
    return list(map(str, result))

def count_elements(arr, x, y):
    counts = [0] * (y - x + 1)

    for num in arr:
        if x <= num <= y:
            counts[num - x] += 1

    return counts

def aaa(users, list1, list2 ):
    userVecs = []
    for user in users:
        userrating = getPRF(list1, 'rating', user)

        prfIndex = ratingPRF(userrating, ['4', '5'])
        cat = parse_hashTag_element(list2, prfIndex, 'category')
        spicy = parse_hashTag_element(list2, prfIndex, 'spiciness')
        lev = parse_hashTag_element(list2, prfIndex, 'level')
        cat_map_dict = {'Korean': 0, 'Japanese': 1, 'Chinese': 2, 'Western': 3}
        cat = [cat_map_dict[value] for value in cat]

        prf1 = count_elements(cat, 0, 3)
        prf2 = count_elements(spicy, 0, 4)
        prf3 = count_elements(lev, 1, 3)
        userVec = np.concatenate([prf1, prf2, prf3])
        userVecs.append(userVec)
    return userVecs

def find_similar_users(userVecs, users, top_k=5):
    similarity_matrix = cosine_similarity(userVecs)
    similar_users = []
    for i, user in enumerate(users):
        user_similarity = similarity_matrix[i]
        top_indices = np.argsort(user_similarity)[-top_k-1:-1][::-1]  # Exclude the user itself
        #similar_users.append([users[idx] for idx in top_indices])
        userdict = {}
        userdict[user] = []
        userdict[user].append([users[idx] for idx in top_indices])
        similar_users.append(userdict)
        #print(similar_users)
    return similar_users

def userFormatting(data):
    formatted_data = [user for user in data['user']] # data unboxing
    return formatted_data

def usersFormatting(data):
    users =[] # user name arr
    for user in data:
        users.append(list(user.keys())[0])
    return users

def recipeFormatting(rData):
    rData = [unit for unit in rData['recipe']] # rData unboxing
    return rData

def rcmd(username):
    formatted_data = userFormatting(data)
    users = usersFormatting(formatted_data)
    rData = recipeFormatting(RData)

    userVecs = aaa(users, data, rData)
    #pprint.pprint(userVecs)

    data_array = np.array(userVecs)

    # 코사인 유사도 계산
    cosine_sim = cosine_similarity(data_array)

    plt.figure(figsize=(8, 6))
    plt.imshow(cosine_sim, cmap='hot', interpolation='nearest')
    plt.colorbar(label='Similarity')
    plt.xticks(np.arange(len(users)), users, rotation=45)
    plt.yticks(np.arange(len(users)), users)
    plt.title('User Similarity Matrix')
    plt.xlabel('User')
    plt.ylabel('User')
    plt.show()

    similar_users = find_similar_users(userVecs, users)

    similar_user = []
    for user in similar_users:
        if username in user:
            for item in user[username]:
                for i in item:
                    similar_user.append(i)

    rcmd = []
    for user in formatted_data:
        for id in similar_user:
            print('id: ', id)
            if id in user:
                userprf = user[id].get('like', [])
                rcmd.extend(userprf)
    print('sending: ', rcmd)

    return rcmd[:7]