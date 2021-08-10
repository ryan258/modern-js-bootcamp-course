const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } = Matter

const width = 800
const height = 600

const engine = Engine.create() // a world comes along w/ the engine
const { world } = engine
// tell render where we want to show our representation of everything inside of our HTML doc
const render = Render.create({
  element: document.body, // where we want to put our world w/in the DOM
  engine: engine,
  options: {
    width,
    height,
    wireframes: false
  }
})

// tell render to start drawing elements on to the screen
Render.run(render)
Runner.run(Runner.create(), engine)

// create and add constraint to world
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
  })
)

// Walls
const walls = [
  //
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true })
]

World.add(world, walls)

// Random Shapes

for (let i = 0; i < 35; i++) {
  if (Math.random() > 0.5) {
    World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50, {}))
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35, {
        render: {
          fillStyle: 'yellow'
        }
      })
    )
  }
}
