export const state = () => ({
    user: { "_id": "5ddea0b4ac1b0c16865ec256", "gender": "Male", "kmutt_id": "60000000000", "name": "Chanchana Wicha", "registered": true, "username": "chanchana" }
})

export const mutations = {
    setuser(state, user) {
        state.user = user
    },
    clearuser(state) {
        state.user = null
    }
}