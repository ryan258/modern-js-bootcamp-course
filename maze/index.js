const { Engine, Render, Runner, World, Bodies } = Matter

const width = 600
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
    wireframes: true
  }
})

// tell render to start drawing elements on to the screen
Render.run(render)
Runner.run(Runner.create(), engine)

// Walls
const walls = [
  //
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
]

World.add(world, walls)
