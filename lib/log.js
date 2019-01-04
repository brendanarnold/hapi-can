
const trace = (msg) => {
  console.log(`TRACE: ${msg}`)
}

const startTimer = () => {
  const _startTime = new Date().getTime()
  return {
    log: (msg) => {
      const elapsed = (new Date()).getTime() - _startTime
      console.log(`TIMER: ${msg} (${elapsed}ms)`)
    },
    elapsed: () => (new Date()).getTime() - _startTime
  }
}

module.exports = {
  trace,
  startTimer
}
