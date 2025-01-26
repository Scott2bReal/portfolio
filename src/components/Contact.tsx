import {
  type Accessor,
  createMemo,
  createSignal,
  onCleanup,
  type Setter,
} from "solid-js"

const isEmpty = (string: string) => {
  if (!string) return true
  if (string.trim().length === 0) return true
  return false
}

export default function Contact() {
  const [name, setName] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [message, setMessage] = createSignal("")
  const [botField, setBotField] = createSignal("")
  const [isSubmitted, setIsSubmitted] = createSignal(false)

  // Form handling
  const isFormComplete = (inputs: Accessor<string>[]) => {
    if (isSubmitted()) return false
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      if (typeof input === "function") {
        if (isEmpty(input())) return false
      } else {
        return false
      }
    }
    return true
  }
  const requiredGetters = [name, email, message]
  const setters = [setName, setEmail, setMessage, setBotField]
  const clearForm = (setters: Setter<string>[]) => {
    setters.forEach((setter) => setter(""))
    return null
  }
  const isDisabled = createMemo(() => !isFormComplete(requiredGetters))
  onCleanup(() => {
    setIsSubmitted(false)
    clearForm(setters)
  })

  return (
    <form
      class="mx-auto flex flex-col gap-2 px-2 md:w-1/2"
      data-netlify="true"
      netlify-honeypot="botField"
      name="contact"
      method="post"
      action="/"
      onSubmit={async (e) => {
        e.preventDefault()
        const data = {
          name: name(),
          email: email(),
          message: message(),
          botField: botField(),
        }
        const encode = (data: { [key: string]: string }) => {
          return Object.keys(data)
            .map(
              (key) =>
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent(data[key] ?? ""),
            )
            .join("&")
        }
        await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: encode({
            "form-name": "contact",
            ...data,
          }),
        })
        clearForm(setters)
        setIsSubmitted(true)
      }}
    >
      <input class="hidden" name="form-name" value="contact" />

      <div class="hidden">
        Don't fill this out if you're human!
        <input
          class="hidden"
          name="botField"
          value={botField()}
          onInput={(e) => setBotField(e.currentTarget.value)}
        />
      </div>

      <div class="text-left child:w-full">
        <label for="name" class="block py-1">
          Name *
        </label>
        <input
          name="name"
          id="name"
          value={name()}
          onInput={(e) => setName(e.currentTarget.value)}
          required
        />
      </div>

      <div class="text-left child:w-full">
        <label class="block py-1" for="email">
          Email *
        </label>
        <input
          name="email"
          id="email"
          type="email"
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
      </div>

      <div class="text-left child:w-full">
        <label class="block py-1" for="message">
          Message *
        </label>
        <textarea
          name="message"
          id="message"
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
          rows="5"
        />
      </div>

      {
        <button
          type="submit"
          id="submitButton"
          disabled={isDisabled()}
          class={`${
            isDisabled() ? `opacity-50` : ``
          } z-10 rounded-xl bg-niceGreen p-2 text-lg text-mainBackground transition duration-300 ease-in-out`}
        >
          {isSubmitted() ? `Thanks for reaching out!` : `Submit`}
        </button>
      }
    </form>
  )
}
