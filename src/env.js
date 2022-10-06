// return variable or throw error if it does not exist
const mustExist = (envVar) => {
	if (!envVar) {
		throw new Error(`Cannot find require env variable ${envVar}`)
	}
}

export const SERVER_URL = process.env.REACT_APP_SERVER_URL
