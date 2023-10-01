import numpy as np
import os
from airbnb.models import Room, Review
from django.contrib.auth import get_user_model

#This runs when the server starts

run_matrix_factorization = True

#Gets user id and returns his top 6 recommended rooms
def get_user_recommendations(user_id):
    if user_id is None:
        details = []
    
        rooms = Room.objects.all()
        for room in rooms:
            id = room.id
            
            reviews = Review.objects.all().filter(room=id)
            
            count = len(reviews)
            avg = 0
            
            if count != 0:
                for review in reviews:
                    avg += review.score
                avg /= count
                
            details.append(
                {'id':id, 
                 'count':count, 
                 'average':avg
                }
            )
        sorted_details = sorted(details, key=lambda x: x['average'], reverse=True)[:6]

        top_room_ids = [room['id'] for room in sorted_details]
        
        print(top_room_ids)
        return top_room_ids
    else:
        loaded_P = np.load('matrix_P.npy')
        loaded_Q = np.load('matrix_Q.npy')
        Recommendation_array=np.dot(loaded_P, loaded_Q.T)

        user_ratings = Recommendation_array[user_id-1]
        top_rooms = np.argsort(user_ratings)[::-1][:6]
        print(top_rooms)
        return top_rooms

def update_recommendations():
    global run_matrix_factorization
    run_matrix_factorization=True
    pass

def matrix_factorization(R, P, Q, K, steps, alpha , beta):
    """
    Matrix factorization using stochastic gradient descent.
    
    Parameters:
        R (numpy.ndarray): User-item interaction matrix.
        P (numpy.ndarray): User matrix.
        Q (numpy.ndarray): Item matrix.
        K (int): Number of latent factors.
        steps (int): Number of iterations.
        alpha (float): Learning rate.
        beta (float): Regularization parameter.

    Returns:
        (numpy.ndarray, numpy.ndarray): Factorized user and item matrices.
    """
    Q = Q.T  # Transpose Q for easier matrix multiplication

    for step in range(steps):
        for i in range(len(R)):
            for j in range(len(R[i])):
                if R[i][j] > 0:
                    eij = R[i][j] - np.dot(P[i, :], Q[:, j])
                    for k in range(K):
                        P[i][k] = np.clip(P[i][k] + alpha * (2 * eij * Q[k][j] - beta * P[i][k]), -1, 1)
                        Q[k][j] = np.clip(Q[k][j] + alpha * (2 * eij * P[i][k] - beta * Q[k][j]), -1, 1)

        # Calculate error
        error = 0
        for i in range(len(R)):
            for j in range(len(R[i])):
                if R[i][j] > 0:
                    error += (R[i][j] - np.dot(P[i, :], Q[:, j])) ** 2
                    for k in range(K):
                        error += (beta / 2) * (P[i][k] ** 2 + Q[k][j] ** 2)

        # Termination condition (you can modify this condition)
        if error < 0.001:
            break

    return P, Q.T  # Transpose Q back

if run_matrix_factorization:
    # Step 1: Generate a synthetic user-item interaction matrix R (replace this with your actual data)
    print("test")
    User = get_user_model()
    users = User.objects.all()
    rooms = Room.objects.all()
    reviews = Review.objects.all()

    num_users = len(users)
    num_rooms = len(rooms)
    print(f"Users:{num_users}")
    print(f"Rooms:{num_rooms}")
    R = np.zeros((num_users, num_rooms))

    for user in users:
        for room in rooms:
            print(f"Testing :{user.id},{room.id}")

    for review in reviews:
        user_index = review.user.id  # Assuming 'id' is the user ID field in your CustomUser model
        room_index = review.room.id  # Assuming 'id' is the room ID field in your Room model
        R[user_index-1][room_index-1] = (review.score-1)/(9)
    
    print(R)

    # Step 2: Initialize user and item matrices P and Q (replace with your initialization method)
    K = 4 # Number of latent factors
    P = np.random.rand(num_users, K).round(2)
    Q = np.random.rand(num_rooms, K).round(2)
    print("Matrix P:")
    print(P)
    print("Matrix Q:")
    print(Q)

    # Step 3: Call matrix_factorization function
    P, Q = matrix_factorization(R, P, Q, K, steps=1000, alpha=0.02, beta=0.01)

    file_P = 'matrix_P.npy'
    file_Q = 'matrix_Q.npy'

    if os.path.exists(file_P):
        os.remove(file_P)

    if os.path.exists(file_Q):
        os.remove(file_Q)

    np.save(file_P, P)
    np.save(file_Q, Q)

    R_pred = np.dot(P, Q.T)  # Predicted user-item interaction matrix

    # Calculate RMSE as an evaluation metric (replace this with your preferred metric)
    def rmse(true, pred):
        return np.sqrt(np.mean((true - pred) ** 2))

    print(f"my_array :{R_pred}")
    print("Row of R_pred :")
    print(R_pred[0, :])
    rmse_value = rmse(R, R_pred)
    print(f"RMSE:{rmse_value}")
    run_matrix_factorization = False
    get_user_recommendations(None)
else:
    print("Matrix factorization skipped")