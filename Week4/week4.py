import turtle

wn = turtle.Screen()
wn.bgcolor('pink')

colors = ['white', 'yellow', 'lightgreen', 'skyblue']
sizes = [100, 90, 80, 70, 60]
points = 5

def drawStar(t, size):
    t.begin_fill()
    for _ in range(points):
        t.forward(size)
        t.right(144)
    t.end_fill()

def drawSpecial(t, size):
    for _ in range(points):
        drawStar(t, size)
        t.right(360 / points * 2)

turtles = []

for color, size in zip(colors, sizes):
    new_turtle = turtle.Turtle()
    new_turtle.speed(0)
    new_turtle.color(color)
    turtles.append(new_turtle)

for turtle, size in zip(turtles, sizes):
    drawSpecial(turtle, size)

wn.mainloop()
