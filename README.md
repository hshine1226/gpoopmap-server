# 대똥여지도 - server

## 😣급똥러들을 위한 화장실 위치 정보 공유 플랫폼 - Server😫

## 기술

### Back-end

- NodeJS
- PassportJS
- Babel
- Express
- MongoDB
- Mongoose
- Google Maps API
- 전국공중화장실표준데이터(공공데이터포털)

## Document

- [회원가입](#회원가입)
- [로그인](#로그인)
- [로그아웃](#로그아웃)
- [이메일로 유저 조회](#이메일로-유저-조회)
- [유저 프로필 업데이트](#유저-프로필-업데이트)
- [화장실 등록](#화장실-등록)
- [화장실 정보](#화장실-정보)
- [주변 화장실 리스트](#주변-화장실-리스트)

### 회원가입

1. Request

`POST /api/join`

2. Parameter

|      Name       |  Description  | Required |
| :-------------: | :-----------: | :------: |
|      name       |   유저 이름   |    ✅    |
|      email      |  유저 이메일  |    ✅    |
|    password     | 유저 비밀번호 |    ✅    |
| passwordConfirm |  유저 이메일  |    ✅    |

3. Sample

- Success

```shell
HTTP/1.1 200 OK
Content-Type: application/json
{
        "user": {
        email: "gpoopmap@gmail.com",
        hash: "273c229ce4cb631a392df58d76ef32fd3880691067e7b96c277815339a22c7e1688d71b5706090a21779b9f2e1313826625f81b0894534d45146df351fd652a9db44e0a6d029202b3e251d9cc8d6fee54c6fa1349ca131d45e067f0aa463d0a07df696770f3410b269668185a7cf45b42604d3cc104edc342683ef992fb7a537189d14869feadfcef567ffb01d0ecae93b69232b4933ff8e1430d8177113088b2081dd2649d3dd1490407b4ec3b738c6d4ee273f1574ce29721d32c0a7b42825ba2f291392046e1a9b960bae20fa06e526676e7f827c72fe4d72f950ae85940cb115f882dbdfd93d8d8aaa1a40094c4734cf0ef43194df3dfbec52a2c0a0686db61a4681aac134de27e8c7d7769293704d0c3b3634245905cc549d83a54a87c8453c97c9fbf7bbb725bdfa95052b285e7b23d0e641f92181b2e28026aa258a0843192939f2db7e81a3ff0d3cc6e28c7f287ccfd259487a63c49ef813c32cf3bec58bd78fd1f7d90dd924a02991fb6a422d1a4585eb185be3efcd37325e061b0d8570a4c1505292914c873622046a354245c6d1472aff97f4d073227c3b897c7d78b5633de0ae35d13353d4dbb6384d7ce29b9097ff31f82cf8f022701077b959e2778e730eaa24448cb7cac17125799ec1c9095d806bd7fc163e41b4f84357ac305fecf8c190a060ab94725105334476d762d0bd3ec8146067514bf907cedf2c",
        name: "123",
        salt: "7f53aacd39714173fbec429b1cf28ad06445bc19bd1890977837e4fabcd03cbd",
        toilets: [],
        __v: 0,
        _id: "5f466199e745692c4ea09a1b"
	}
}
```

- Fail

```shell
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
{
        "error": "Invalid confirm password."
}
```

### 로그인

1. Request

`POST /api/login`

2. Parameter

|   Name   |  Description  | Required |
| :------: | :-----------: | :------: |
|  email   |  유저 이메일  |    ✅    |
| password | 유저 비밀번호 |    ✅    |

3. Sample

- Success

```shell
HTTP/1.1 200 OK
Content-Type: application/json
{
        "user": {
        email: "gpoopmap@gmail.com",
        hash: "273c229ce4cb631a392df58d76ef32fd3880691067e7b96c277815339a22c7e1688d71b5706090a21779b9f2e1313826625f81b0894534d45146df351fd652a9db44e0a6d029202b3e251d9cc8d6fee54c6fa1349ca131d45e067f0aa463d0a07df696770f3410b269668185a7cf45b42604d3cc104edc342683ef992fb7a537189d14869feadfcef567ffb01d0ecae93b69232b4933ff8e1430d8177113088b2081dd2649d3dd1490407b4ec3b738c6d4ee273f1574ce29721d32c0a7b42825ba2f291392046e1a9b960bae20fa06e526676e7f827c72fe4d72f950ae85940cb115f882dbdfd93d8d8aaa1a40094c4734cf0ef43194df3dfbec52a2c0a0686db61a4681aac134de27e8c7d7769293704d0c3b3634245905cc549d83a54a87c8453c97c9fbf7bbb725bdfa95052b285e7b23d0e641f92181b2e28026aa258a0843192939f2db7e81a3ff0d3cc6e28c7f287ccfd259487a63c49ef813c32cf3bec58bd78fd1f7d90dd924a02991fb6a422d1a4585eb185be3efcd37325e061b0d8570a4c1505292914c873622046a354245c6d1472aff97f4d073227c3b897c7d78b5633de0ae35d13353d4dbb6384d7ce29b9097ff31f82cf8f022701077b959e2778e730eaa24448cb7cac17125799ec1c9095d806bd7fc163e41b4f84357ac305fecf8c190a060ab94725105334476d762d0bd3ec8146067514bf907cedf2c",
        name: "123",
        salt: "7f53aacd39714173fbec429b1cf28ad06445bc19bd1890977837e4fabcd03cbd",
        toilets: [],
        __v: 0,
        _id: "5f466199e745692c4ea09a1b"
	}
}
```

- Fail

```shell
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
{
        "error": "User does not exist."
}
```

### 로그아웃

1. Request

`GET /api/logout`

2. Parameter

| Name | Description | Required |
| :--: | :---------: | :------: |
|  -   |      -      |    -     |

3. Sample

- Success

```shell
HTTP/1.1 200 OK
Content-Type: application/json
{
        "success": true
}
```

- Fail

```shell
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
{
        "error": "Failed logout."
}
```

### 이메일로 유저 조회

1. Request

`GET /api/users/user`

2. Parameter

| Name  | Description | Required |
| :---: | :---------: | :------: |
| email | 유저 이메일 |    ✅    |

3. Sample

- Success

```shell
HTTP/1.1 200 OK
Content-Type: application/json
{
        "user": {
            email: "gpoopmap@gmail.com",
            hash: "273c229ce4cb631a392df58d76ef32fd3880691067e7b96c277815339a22c7e1688d71b5706090a21779b9f2e1313826625f81b0894534d45146df351fd652a9db44e0a6d029202b3e251d9cc8d6fee54c6fa1349ca131d45e067f0aa463d0a07df696770f3410b269668185a7cf45b42604d3cc104edc342683ef992fb7a537189d14869feadfcef567ffb01d0ecae93b69232b4933ff8e1430d8177113088b2081dd2649d3dd1490407b4ec3b738c6d4ee273f1574ce29721d32c0a7b42825ba2f291392046e1a9b960bae20fa06e526676e7f827c72fe4d72f950ae85940cb115f882dbdfd93d8d8aaa1a40094c4734cf0ef43194df3dfbec52a2c0a0686db61a4681aac134de27e8c7d7769293704d0c3b3634245905cc549d83a54a87c8453c97c9fbf7bbb725bdfa95052b285e7b23d0e641f92181b2e28026aa258a0843192939f2db7e81a3ff0d3cc6e28c7f287ccfd259487a63c49ef813c32cf3bec58bd78fd1f7d90dd924a02991fb6a422d1a4585eb185be3efcd37325e061b0d8570a4c1505292914c873622046a354245c6d1472aff97f4d073227c3b897c7d78b5633de0ae35d13353d4dbb6384d7ce29b9097ff31f82cf8f022701077b959e2778e730eaa24448cb7cac17125799ec1c9095d806bd7fc163e41b4f84357ac305fecf8c190a060ab94725105334476d762d0bd3ec8146067514bf907cedf2c",
            name: "123",
            salt: "7f53aacd39714173fbec429b1cf28ad06445bc19bd1890977837e4fabcd03cbd",
            toilets: [],
            __v: 0,
            _id: "5f466199e745692c4ea09a1b"
	}
}
```

- Fail

```shell
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
{
        "error": "User does not exist."
}
```

### 유저 프로필 업데이트

1. Request

`GET /api/users/user/:id`

2. Parameter

|  Name  |   Description    | Required |
| :----: | :--------------: | :------: |
|   id   | 유저 식별 아이디 |    ✅    |
| email  |   유저 이메일    |    -     |
|  name  |    유저 이름     |    -     |
| avatar |   유저 아바타    |    -     |

3. Sample

- Success

```shell
HTTP/1.1 200 OK
Content-Type: application/json
{
        "user": {
            email: "gpoopmap@gmail.com",
            hash: "273c229ce4cb631a392df58d76ef32fd3880691067e7b96c277815339a22c7e1688d71b5706090a21779b9f2e1313826625f81b0894534d45146df351fd652a9db44e0a6d029202b3e251d9cc8d6fee54c6fa1349ca131d45e067f0aa463d0a07df696770f3410b269668185a7cf45b42604d3cc104edc342683ef992fb7a537189d14869feadfcef567ffb01d0ecae93b69232b4933ff8e1430d8177113088b2081dd2649d3dd1490407b4ec3b738c6d4ee273f1574ce29721d32c0a7b42825ba2f291392046e1a9b960bae20fa06e526676e7f827c72fe4d72f950ae85940cb115f882dbdfd93d8d8aaa1a40094c4734cf0ef43194df3dfbec52a2c0a0686db61a4681aac134de27e8c7d7769293704d0c3b3634245905cc549d83a54a87c8453c97c9fbf7bbb725bdfa95052b285e7b23d0e641f92181b2e28026aa258a0843192939f2db7e81a3ff0d3cc6e28c7f287ccfd259487a63c49ef813c32cf3bec58bd78fd1f7d90dd924a02991fb6a422d1a4585eb185be3efcd37325e061b0d8570a4c1505292914c873622046a354245c6d1472aff97f4d073227c3b897c7d78b5633de0ae35d13353d4dbb6384d7ce29b9097ff31f82cf8f022701077b959e2778e730eaa24448cb7cac17125799ec1c9095d806bd7fc163e41b4f84357ac305fecf8c190a060ab94725105334476d762d0bd3ec8146067514bf907cedf2c",
            name: "123",
            salt: "7f53aacd39714173fbec429b1cf28ad06445bc19bd1890977837e4fabcd03cbd",
            toilets: [],
            __v: 0,
            _id: "5f466199e745692c4ea09a1b"
	}
}
```

- Fail

```shell
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
{
        "error": "An error has occured. Please try again."
}
```

### 화장실 등록

1. Request

`POST /api/toilets/toilet`

2. Parameter

|   Name    |    Description    | Required |
| :-------: | :---------------: | :------: |
|    lat    |    화장실 위도    |    ✅    |
|    lng    |    화장실 경도    |    ✅    |
|   name    |    화장실 이름    |    ✅    |
|   type    |    화장실 타입    |    ✅    |
|   memo    | 화장실 한 줄 메모 |    ✅    |
| imageFile |    화장실 사진    |    -     |

3. Sample

- Success

```shell
HTTP/1.1 200 OK
Content-Type: application/json
{
	"toilet":
		{
			"location": {
				"type":"Point",
				"coordinates": [127.440799, 36.312942]
			},
			"_id":"5f2c452e0bce591c0f2c9c73",
			"type":"이동화장실",
			"name":"우성사료물류 앞",
			"memo":"",
			"creator":"",
			"imageUrl":"",
			"createdAt":"2020-08-06T18:00:14.094Z"
		}
}
```

- Fail

```shell
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
{
        "error": "An error has occured. Please try again."
}
```

### 화장실 정보

1. Request

`GET /api/toilets/toilet:id`

2. Parameter

| Name |  Description  | Required |
| :--: | :-----------: | :------: |
|  id  | 화장실 아이디 |    ✅    |

3. Sample

- Success

```shell
HTTP/1.1 200 OK
Content-Type: application/json
{
	"toilet":
		{
			"location": {
				"type":"Point",
				"coordinates": [127.440799, 36.312942]
			},
			"_id":"5f2c452e0bce591c0f2c9c73",
			"type":"이동화장실",
			"name":"우성사료물류 앞",
			"memo":"",
			"creator":"",
			"imageUrl":"",
			"createdAt":"2020-08-06T18:00:14.094Z"
		}
}
```

- Fail

```shell
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
{
        "error": "An error has occured. Please try again."
}
```

### 주변 화장실 리스트

1. Request

`GET /api/toilets/nearby`

2. Parameter

|    Name     |           Description            | Required |
| :---------: | :------------------------------: | :------: |
|     lat     |               위도               |    ✅    |
|     lng     |               경도               |    ✅    |
| maxDistance | 위도와 경도 좌표로부터 조회 범위 |    ✅    |

3. Sample

- Success

```shell
HTTP/1.1 200 OK
Content-Type: application/json
{
	toilets: [
		{location: {type: "Point", coordinates: [127.45388509759218, 36.316931032553974]},…},…
		]
}
```

- Fail

```shell
HTTP/1.1 400 BAD REQUEST
Content-Type: application/json
{
        "error": "An error has occured. Please try again."
}
```
