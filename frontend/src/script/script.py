# -*- coding: utf-8 -*-

import argparse
import json

def add_user(users, name, email):
    user_id = max(user["id"] for user in users) + 1
    new_user = {"id": user_id, "name": name, "email": email, "favorite_cars": []}
    users.append(new_user)
    return new_user

def delete_user(users, user_id):
    for user in users:
        if user["id"] == user_id:
            users.remove(user)
            return
    print("No user with the specified ID was found")

def add_car_to_user(users, user_id, car_id):
    user = get_user(users, user_id)
    if car_id not in user["favorite_cars"]:
        user["favorite_cars"].append(car_id)

def delete_car_from_user(users, user_id, car_id):
    user = get_user(users, user_id)
    if car_id in user["favorite_cars"]:
        user["favorite_cars"].remove(car_id)

def get_user(users, user_id):
    for user in users:
        if user["id"] == user_id:
            return user
    print("The car is not assigned as a favorite to the user")

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--add", action="store_true", help="Add a new user")
    parser.add_argument("--delete", type=int, help="Delete a user by their ID")
    parser.add_argument("--add_car", nargs=2, type=int, help="Add a car as a favorite to a user")
    parser.add_argument("--delete_car", nargs=2, type=int, help="Remove a car from a user's favorites list")
    args = parser.parse_args()

    with open("../data/users.json", "r") as users_file:
        data = json.load(users_file)
        users = data["usuarios"]

    if args.add:
        name = input("Enter the name of the new user: ")
        email = input("Enter the email of the new user: ")
        new_user = add_user(users, name, email)
        print("The new user has been added with ID " + str(new_user['id']))
    elif args.delete:
        delete_user(users, args.delete)
        print("User has been deleted successfully")
        
    elif args.add_car:
        add_car_to_user(users, args.add_car[1], args.add_car[0])
        print("The car has been added as a favorite to the user successfully")
        
    elif args.delete_car:
        delete_car_from_user(users, args.delete_car[1], args.delete_car[0])
        print("Car successfully removed from user favorites list")
        
    else:
        print("No valid command specified")

    with open("../data/users.json", "w") as users_file:
        json.dump(data, users_file, indent=2)

if __name__ == "__main__":
    main()
