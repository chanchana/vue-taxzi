export const state = () => ({
    user: null
})

export const mutations = {
    setuser(state, user) {
        state.user = user
    },
    clearuser(state) {
        state.user = null
    }
}