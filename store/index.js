export const state = () => ({
    user:null,
    party:null,
    // user: {
    //     "_id": "5ddea0b4ac1b0c16865ec256",
    //     "gender": "Male",
    //     "kmutt_id": "60000000000",
    //     "name": "Chanchana Wicha",
    //     "registered": true,
    //     "username": "chanchana"
    //   },
    //    party: {
    //     "_id": "5de235029b771a44b382e5d0",
    //     "appointment": "2020-02-02T00:03",
    //     "from": "KMUTT",
    //     "max": 4,
    //     "members": [
    //       {
    //         "_id": "5ddea0b4ac1b0c16865ec256",
    //         "gender": "Male",
    //         "kmutt_id": "60000000000",
    //         "name": "Chanchana Wicha",
    //         "registered": true,
    //         "username": "chanchana"
    //       },
    //       {
    //         "_id": "5de187ed2c5d92f7934bacff",
    //         "gender": "Female",
    //         "kmutt_id": "60070503428",
    //         "name": "Damisa Tangprasobsang",
    //         "registered": true,
    //         "username": "noey"
    //       }
    //     ],
    //     "service": "None",
    //     "status": "active",
    //     "to": "Mitr"
    //   }
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