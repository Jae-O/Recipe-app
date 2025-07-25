import json
import random
import string
import matplotlib as plt


def generate_random_string(length):
    """임의 패스워드 생성 함수"""
    letters = string.ascii_letters + string.digits
    return ''.join(random.choice(letters) for _ in range(length))


def generate_random_integer():
    """임의 평점 생성 함수"""
    mean = 2.5  # 평균 값
    std_dev = 1.5  # 표준편차 값

    value = random.gauss(mean, std_dev)
    value = max(0, min(5, round(value)))  # 0에서 5 사이 값으로 조정
    return int(value)


def generating_stimulation():
    """평점 생성 값 확인"""
    # 10000번 실행하여 값 생성
    values = [generate_random_integer() for _ in range(10000)]

    # 0에서 5의 값이 나온 빈도 계산
    counts = [values.count(i) for i in range(6)]

    # 그래프 그리기
    x = range(6)
    plt.bar(x, counts)
    plt.xlabel('Value')
    plt.ylabel('Frequency')
    plt.title('Frequency of Values (0 to 5)')
    plt.xticks(x)
    plt.show()

def generate_random_numbers(max, n):
    numbers = random.sample(range(1, max), n)
    return numbers

# 랜덤으로 hashTag 값 선택
hashTag_choices = ['Korean', 'Japanese', 'Chinese', 'Western']
spicy_choices = ['spicy', 'mild']
level_choices = ['3', '2', '1']

data = {"recipe": []}
data1 = {"user": []}
data2 = {'user':[]}

for i in range(1, 201):
    hashTag = {
        "category": random.choice(hashTag_choices),
        "spiciness": random.choice(spicy_choices),
        "level": random.choice(level_choices)
    }
    recipe = {
        "index": str(i),
        "material": generate_random_string(10),
        "sequence": "",
        "score": generate_random_integer(),
        "hashTag": hashTag
    }
    data["recipe"].append(recipe)

for i in range(1, 51):
    user = {
        f"user{i}":{
            "password": generate_random_string(10),
            "like": generate_random_numbers(201, 7),
            "view": generate_random_numbers(201, 15),
            "rating": {
                str(generate_random_numbers(201, 5)): str(generate_random_integer()),
                str(generate_random_numbers(201, 5)): str(generate_random_integer()),
                str(generate_random_numbers(201, 5)): str(generate_random_integer()),
                str(generate_random_numbers(201, 5)): str(generate_random_integer()),
                str(generate_random_numbers(201, 5)): str(generate_random_integer()),
                str(generate_random_numbers(201, 5)): str(generate_random_integer()),
            }
        }
    }
    data1["user"].append(user)

# JSON 파일로 데이터 저장
with open("recipe2.json", "w") as outfile:
    json.dump(data, outfile, indent=4)