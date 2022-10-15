// return variable or throw error if it does not exist
const mustExist = (envVar) => {
	if (!envVar) {
		throw new Error(`Cannot find require env variable ${envVar}`)
	}
	return envVar
}

export const SERVER_URL = mustExist(process.env.REACT_APP_SERVER_URL)
