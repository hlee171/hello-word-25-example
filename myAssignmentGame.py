import random

def generate_numbers():
    # Generate four random numbers between 1 and 50
    num1 = random.randint(1, 30)
    num2 = random.randint(1, 30)
    num3 = random.randint(1, 30)
    num4 = random.randint(1, 30)
    return num1, num2, num3, num4

def intro_story():
    print("Welcome to the Zombie Escape Game in the IxD building.")
    print("        \_/                                               ")
    print("      --(_)--                                             ")
    print("     / \   /_\                                            ")
    print("        |Q|                                               ")
    print("  .-----' '-----.                                         ")
    print(" /___[SVA IxD]___\                                        ")       
    print("  | [] .-.-. [] |                                         ")    
    print("..|____|_|_|____|............................🧟           ")
    print("To escape, you need to add four numbers given by the host.")
    print("You have 3 attempts to solve it.")  # Added attempt information
    
    attempts = 3  # Number of quiz attempts
    has_key = False  # Added key status
    
    while attempts > 0:
        user_input = input("Type 'start' to begin: ").lower()
        
        if user_input == "start":
            num1, num2, num3, num4 = generate_numbers()
            correct_answer = num1 + num2 + num3 + num4
            print(f"The host says: '{num1} + {num2} + {num3} + {num4} equals what?'")
            
            while True:
                try:
                    user_guess = int(input("Enter your answer: "))
                    break
                except ValueError:
                    print("Please enter a valid number.")
            
            if user_guess == correct_answer:
                print("The host says: 'Correct! You can escape.'")
                if not has_key:
                    has_key = True  # Acquired the key
                    print("Congratulations! You have escaped and found a key!")
                    print("                                                  ")
                    print("  8 8 8 8                     ,ooo.               ")
                    print("  8a8 8a8                    oP   ?b              ")
                    print(" d888a888zzzzzzzzzzzzzzzzzzzz8     8b             ")
                    print("                             ?o___oP'             ")
                print("Game over.")
                break
            else:
                attempts -= 1
                if attempts > 0:
                    print(f"The host says: 'Wrong! Try again. Remaining tries: {attempts}'")
                else:
                    print("The host says: 'Wrong! You will now become a zombie.'")
                    print("        _,-\"-._                                        ")
                    print("      ,\"        \".                                    ")
                    print("     /    ,-,  ,\"\\                                    ")
                    print("    \"    /   \\ | o|                                   ")  
                    print("    \\    `-o-\"  `-',                                  ")
                    print("     `,   _.--'`'--`                                    ")
                    print("       `--`---'                    |   _)               ")    
                    print("         ,' '      _  /  _ \\  ` \\   _ \\ |  -_)       ")
                    print("       ./ ,  `,    ___|\\___/_|_|_|_.__/_|\\___|        ")
                    print("       / /     \\                                       ")    
                    print("      (_)))_ _,\"                                       ")        
                    print("         _))))_,                                        ")
                    print("--------(_,-._)))-------------------------------\"\"\"  ")
                    print("Game over.")
        
        else:
            print("Invalid input. Type 'start' to begin.")

if __name__ == "__main__":
    intro_story()
