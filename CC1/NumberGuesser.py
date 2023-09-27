# from math import *
from random import *
from time import *


# ! Add aide (recalcule min & max en fonction des saisies)
def NumberGuesser(min_x=1, max_x=10_000, nb_essai_max=10):
    nb_essai = 0
    y = 0
    x = randint(min_x, max_x)

    while y != x:
        if nb_essai > nb_essai_max:
            print("Perdu ! Tu t'es trompé trop de fois.")
            sleep(2)
            print(f"Le nombre était : {x}.")
            sleep(2)
            quit()

        nb_essai += 1
        y = int(input(f"Essai {nb_essai}/{nb_essai_max} : Trouve le nombre entre {min_x} et {max_x} : "))

        if x < y:
            print(f"Trop haut ! ({y})")
        elif x > y:
            print(f"Trop bas ! ({y})")

        if nb_essai == nb_essai_max:
            print("Dernier essai !")
            sleep(3)

    print("\nFélicitation ! Tu as trouvé ! ")
    sleep(2)
    print(f"Le nombre était : {x}.")
    sleep(2)


if __name__ == "__main__":
    NumberGuesser()

quit()
