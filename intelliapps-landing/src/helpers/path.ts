import p5 from "p5"

export interface IPathLine {
  p1: p5.Vector
  p2: p5.Vector
  distFrom: number
  distTo: number
}

export const getPathLength = (vertices: p5.Vector[]) => {
  let length = 0
  vertices.forEach((p1, i) => {
    const p2 = vertices[i === vertices.length - 1 ? 0 : i + 1]
    length += p1.dist(p2)
  })
  return length
}

export const getPathLines = (vertices: p5.Vector[]) => {
  let pathLines: IPathLine[] = []
  for (let i = 0; i < vertices.length; i++) {
    const lastDistTo = i !== 0 ? pathLines[i - 1].distTo : 0,
      p1 = vertices[i],
      p2 = vertices[i === vertices.length - 1 ? 0 : i + 1],
      distFrom = lastDistTo,
      distTo = distFrom + p1.dist(p2)
    pathLines.push({ p1, p2, distFrom, distTo })
  }
  return pathLines
}