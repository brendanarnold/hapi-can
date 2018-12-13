
const trace = (msg) => {
  console.log(`TRACE: ${msg}`)
}

const startTimer = (msg) => {
  const _startTime = new Date().getTime()
  return {
    stop: () => { 
      const elapsed = (new Date()).getTime() - _startTime
      console.log(`TIMER: ${msg} (${elapsed}ms)`)
    }
  }
}

module.exports = {
  trace,
  startTimer
}