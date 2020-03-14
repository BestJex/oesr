const PositionModel = require('../models/position')

exports.getPositionList = function (selectType, selectCity, selectTab, currentPage, pageNum) {
  let skipCounts = (currentPage - 1) * pageNum
  let findConditions = {}
  if (selectType) findConditions.positionType = selectType
  if (selectCity) findConditions.positionCity = selectCity
  // 根据 最新发布 最快处理 处理率最高 进行排序 默认不排序
  let sortCondition = {}
  if (selectTab === 'new') sortCondition.createdAt = -1
  if (selectTab === 'fast') sortCondition.processingTime = 1
  if (selectTab === 'ratio') sortCondition.processingRatio = -1
  return Promise.all([
    PositionModel.find(findConditions).sort(sortCondition).skip(skipCounts).limit(pageNum),
    PositionModel.find(findConditions).sort(sortCondition).count(true)
  ]).then(([data, total]) => {
    return {
      data: data,
      currentPage: +currentPage,
      pageNum: pageNum,
      total
    }
  })
}

exports.addPositionList = function (data) {
  return PositionModel.insertMany(data)
}

exports.getPositionDetailList = function (positionDetailId) {
  return PositionModel.findById(positionDetailId)
}