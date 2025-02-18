import { getRepository, IsNull } from 'typeorm'

import CourseScoreModel from './courseScore.model'

import { CourseScore } from 'devu-shared-modules'

const connect = () => getRepository(CourseScoreModel)

export async function create(courseScore: CourseScore) {
  return await connect().save(courseScore)
}

export async function update(courseScore: CourseScore) {
  const { id, courseId, userId, score, letterGrade } = courseScore

  if (!id) throw new Error('Missing Id')

  return await connect().update(id, { courseId, userId, score, letterGrade })
}

export async function _delete(id: number) {
  return await connect().softDelete({ id, deletedAt: IsNull() })
}

export async function retrieve(id: number) {
  return await connect().findOne({ id, deletedAt: IsNull() })
}

// Retrieve all the courseScores linked to a particular course
export async function list() {
  return await connect().find({ deletedAt: IsNull() })
}

export default {
  create,
  retrieve,
  update,
  _delete,
  list,
}
