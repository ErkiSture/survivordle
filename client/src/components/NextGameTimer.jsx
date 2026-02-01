import { useEffect, useState } from "react";

export function NextGameTimer() {

  const [resetTime, setResetTime] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)

  // useEffect(() => {
  //   fetch("/api/next_reset")
  //   .then(response => response.json())
  //   .then(data => {
  //     //console.log(data, data.next_reset)
  //     const date = new Date(data.next_reset)
  //     const timeLeft = new Date(date - new Date())

  //     console.log(timeLeft, new Date())
  //     setResetTime(date)
  //     setTimeLeft(timeLeft)
  //   })
  // }, [])

  return (

    <div>
      {/* {resetTime ? resetTime.getMinutes() : "loading..."} */}
      {/* {timeLeft.getHours()} */}
    </div>

  )
}