export async function getGuessResult(guessSurvivor, targetSurvivor) {

  const res = await fetch(`/api/get_survivor_stats/${encodeURIComponent(guessSurvivor)}`);
  if (!res.ok) return false;
  const survivor = await res.json()
  
  const result = {
    gender: compareGender(survivor.gender, targetSurvivor.gender),
    hair: compareHair(survivor.hair, targetSurvivor.hair),
    licensed: compareLicensed(survivor.licensed, targetSurvivor.licensed),
    origin: compareOrigin(survivor.origin, targetSurvivor.origin),
    release: compareRelease(survivor.release, targetSurvivor.release),
  }
  return result
}


export function isCorrectGuess(result) {
  for (let key in result) {
    if (result[key][0] !== true) return false
  }
  return true
}


function compareGender(guessGender, targetGender) {
  if (guessGender === targetGender) {
    return [true, guessGender];
  } else {
    return [false, guessGender];
  }  
}


function compareHair(guessHair, targetHair) {
  if (guessHair === targetHair) {
    return [true, guessHair];
  } else {
    return [false, guessHair];
  }  
}


function compareLicensed(guessLicensed, targetLicensed) {
  if (guessLicensed === targetLicensed) {
    return [true, guessLicensed];
  } else {
    return [false, guessLicensed];
  }  
}


function compareOrigin(guessOrigin, targetOrigin) {
  if (guessOrigin === targetOrigin) {
    return [true, guessOrigin];
  } else {
    return [false, guessOrigin];
  }  
}


function compareRelease(guessRelease, targetRelease) {
  if (guessRelease === targetRelease) {
    return [true, guessRelease];
  } else {
    return guessRelease > targetRelease ? [false, `${guessRelease}↓`] : [false,  `${guessRelease}↑`]
  }
}