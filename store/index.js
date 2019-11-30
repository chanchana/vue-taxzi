export const state = () => ({
    // TODO: set all to null
    user: { "_id": "5ddea0b4ac1b0c16865ec256", "gender": "Male", "kmutt_id": "60000000000", "name": "Chanchana Wicha", "registered": true, "username": "chanchana" },
    party: {
        "_id": "5dde529b3dc19a0c80455a94",
        "from": "KMUTT",
        "lady": false,
        "members": [
            {
                "_id": "5ddd6af91a14aec5d2ea1ec6",
                "gender": "Female",
                "kmutt_id": "60000000000",
                "name": "John Wick",
                "registered": true,
                "username": "testuser"
            },
            {
                "_id": "5ddea0b4ac1b0c16865ec256",
                "gender": "Male",
                "kmutt_id": "60000000000",
                "name": "Chanchana Wicha",
                "registered": true,
                "username": "chanchana"
            }
        ],
        "status": "active",
        "to": "Mitr"
    }
})

export const mutations = {
    setuser(state, user) {
        state.user = user
    },
    clearuser(state) {
        state.user = null
    },
    setparty(state, party) {
        state.party = party
    },
    clearparty(state) {
        state.party = null
    },
}