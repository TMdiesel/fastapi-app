import random
import requests
import datetime
import json
import streamlit as st
import pandas as pd

page = st.sidebar.selectbox("Choose your page", ["users", "rooms", "bookings"], index=2)

if page == "users":
    st.title("ユーザー")

    # ユーザー一覧取得
    url = "http://127.0.0.1:8000/users"
    res = requests.get(url)
    users = res.json()
    users_dict = {}
    for user in users:
        users_dict[user["username"]] = user["user_id"]
    st.write("### ユーザー一覧")
    df_users = pd.DataFrame(users)
    st.table(df_users)

    # ユーザー追加
    st.write("### ユーザー登録")
    with st.form(key="user"):
        username: str = st.text_input("username", max_chars=12)
        data = {"username": username}
        submit_button = st.form_submit_button(label="request")

    if submit_button:
        url = "http://127.0.0.1:8000/users"
        res = requests.post(url, data=json.dumps(data))
        if res.status_code == 200:
            st.success("ユーザー登録完了")

    st.write("### ユーザー削除")
    with st.form(key="user_delete"):
        username = st.selectbox("username", users_dict.keys())
        submit_button_delete = st.form_submit_button(label="request")
    if submit_button_delete:
        user_id = users_dict[username]
        url = f"http://127.0.0.1:8000/users/{user_id}"
        res = requests.delete(url)
        if res.status_code == 500:
            st.success("ユーザー削除完了")


if page == "rooms":
    st.title("会議室")

    # 会議室一覧取得
    url = "http://127.0.0.1:8000/rooms"
    res = requests.get(url)
    rooms = res.json()
    rooms_dict = {}
    for room in rooms:
        rooms_dict[room["room_name"]] = {
            "room_id": room["room_id"],
            "capacity": room["capacity"],
        }
    st.write("### 会議室一覧")
    df_rooms = pd.DataFrame(rooms)
    st.table(df_rooms)

    st.write("### 会議室登録")
    with st.form(key="booking"):
        room_name: str = st.text_input("room_name", max_chars=12)
        capacity: int = st.number_input("capacity", step=1)
        data = {"room_name": room_name, "capacity": capacity}
        submit_button = st.form_submit_button(label="request")

    if submit_button:
        url = "http://127.0.0.1:8000/rooms"
        res = requests.post(url, data=json.dumps(data))
        if res.status_code == 200:
            st.success("会議室登録完了")

    st.write("### 会議室削除")
    with st.form(key="booking_delete"):
        room_name = st.selectbox("room_name", rooms_dict.keys())
        submit_button_delete = st.form_submit_button(label="request")
    if submit_button_delete:
        room_id = rooms_dict[room_name]["room_id"]
        url = f"http://127.0.0.1:8000/rooms/{room_id}"
        res = requests.delete(url)
        if res.status_code == 500:
            st.success("会議室削除完了")


if page == "bookings":
    st.title("予約")

    # ユーザー一覧取得
    url = "http://127.0.0.1:8000/users"
    res = requests.get(url)
    users = res.json()
    users_dict = {}
    for user in users:
        users_dict[user["username"]] = user["user_id"]
    st.write("### ユーザー一覧")
    df_users = pd.DataFrame(users)
    st.table(df_users)

    # 会議室一覧取得
    url = "http://127.0.0.1:8000/rooms"
    res = requests.get(url)
    rooms = res.json()
    rooms_dict = {}
    for room in rooms:
        rooms_dict[room["room_name"]] = {
            "room_id": room["room_id"],
            "capacity": room["capacity"],
        }

    st.write("### 会議室一覧")
    df_rooms = pd.DataFrame(rooms)
    st.table(df_rooms)

    # 予約一覧取得
    url = "http://127.0.0.1:8000/bookings"
    res = requests.get(url)
    bookings = res.json()

    st.write("### 予約一覧")
    df_bookings = pd.DataFrame(bookings)
    df_bookings["user_id"] = df_bookings["user_id"].map(
        {v: k for k, v in users_dict.items()}
    )
    df_bookings["room_id"] = df_bookings["room_id"].map(
        {v["room_id"]: k for k, v in rooms_dict.items()}
    )
    df_bookings["start_datetime"] = df_bookings["start_datetime"].map(
        lambda t: datetime.datetime.fromisoformat(t).strftime("%Y/%m/%d %H:%M")
    )
    df_bookings["end_datetime"] = df_bookings["end_datetime"].map(
        lambda t: datetime.datetime.fromisoformat(t).strftime("%Y/%m/%d %H:%M")
    )
    df_bookings.rename(
        {"user_id": "username", "room_id": "room_name"}, axis=1, inplace=True
    )
    st.table(df_bookings)

    st.write("### 予約登録")
    with st.form(key="booking"):
        username: str = st.selectbox("username", users_dict.keys())
        room_name: str = st.selectbox("room_name", rooms_dict.keys())
        booked_num: int = st.number_input("booked_num", step=1, min_value=1)
        date = st.date_input("date", min_value=datetime.date.today())
        start_time = st.time_input("start_time", value=datetime.time(hour=9, minute=0))
        end_time = st.time_input("end_time", value=datetime.time(hour=20, minute=0))

        submit_button = st.form_submit_button(label="request")

    if submit_button:
        user_id: int = users_dict[username]
        room_id: int = rooms_dict[room_name]["room_id"]
        capacity: int = rooms_dict[room_name]["capacity"]

        data = {
            "user_id": user_id,
            "room_id": room_id,
            "booked_num": booked_num,
            "start_datetime": datetime.datetime(
                year=date.year,
                month=date.month,
                day=date.day,
                hour=start_time.hour,
                minute=start_time.minute,
            ).isoformat(),
            "end_datetime": datetime.datetime(
                year=date.year,
                month=date.month,
                day=date.day,
                hour=end_time.hour,
                minute=end_time.minute,
            ).isoformat(),
        }
        if booked_num <= capacity:
            url = "http://127.0.0.1:8000/bookings"
            res = requests.post(url, data=json.dumps(data))
            if res.status_code == 200:
                st.success("予約完了")
            st.json(res.json())
        else:
            st.error("予約人数が会議室の上限を超えています")

    st.write("### 予約削除")
    with st.form(key="booking_delete"):
        booking_id = st.selectbox("booking_id", df_bookings["booking_id"])
        submit_button_delete = st.form_submit_button(label="request")
    if submit_button_delete:
        url = f"http://127.0.0.1:8000/bookings/{booking_id}"
        res = requests.delete(url)
        if res.status_code == 500:
            st.success("予約削除完了")
