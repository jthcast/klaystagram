const renameKeys = (obj: Object, newKeys: Object) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [newKeys[key] || key]: obj[key] },
    }),
    {}
  )

export const last = (array: Array<any>) => {
  return array?.length ? array[array.length - 1] : undefined
}

export const feedParser = (feed: Array<any> | Object) => {
  const photoKeys = {
    0: `id`,
    1: `ownerHistory`,
    2: `data`,
    3: `name`,
    4: `location`,
    5: `caption`,
    6: `timestamp`,
  }

  if (!Array.isArray(feed)) {
    return renameKeys(feed, photoKeys)
  }
  return feed.map((photo) => renameKeys(photo, photoKeys))
}
