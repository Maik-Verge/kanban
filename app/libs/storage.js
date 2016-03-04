export default {
  get(k) {
    try {
      return JSON.parse(localStorage.getItem(k));
    }
    catch(e) {
      return null;
    }
  },
  set(k,v) {
    localStorage.setItem(k, JSON.stringify(v));
  }
};


/* Here we are stuck with the localstorage unless we change the code.

This could be converted into a factory (storage => {...}) and make it possible to swap storage out.

localForage is a tool for operating with localstorage*/

/*An alternative way would be to take a snapshot only when the window gets closed. There's a
Window level beforeunload hook that could be used. The problem with this approach is that it is
brittle. What if something unexpected happens and the hook doesn't get triggered for some reason?
You'll lose data.*/
