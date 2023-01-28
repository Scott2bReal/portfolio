import { Accessor, createMemo, createSignal, onCleanup, Setter } from 'solid-js'

const isEmpty = (string: string) => {
  if (!string) return true
  if (string.trim().length === 0) return true
  return false
}

export default function Contact() {
  const [name, setName] = createSignal('')
  const [email, setEmail] = createSignal('')
  const [message, setMessage] = createSignal('')
  const [botField, setBotField] = createSignal('')
  const [isSubmitted, setIsSubmitted] = createSignal(false)
  console.log(
    `Hi there, thanks for checking out my site! I'm always happy to collaborate and meet new people, so please hit me up using the contact form if you're so inclined`
  )

  // Form handling
  const isFormComplete = (inputs: Accessor<string>[]) => {
    if (isSubmitted()) return false
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i]
      if (typeof input === 'function') {
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
    setters.forEach((setter) => setter(''))
    return null
  }
  const isDisabled = createMemo(() => !isFormComplete(requiredGetters))
  onCleanup(() => {
    setIsSubmitted(false)
    clearForm(setters)
  })

  return (
    <form
      class='flex flex-col gap-2 md:w-[50vw] mx-auto px-2'
      data-netlify='true'
      netlify-honeypot='botField'
      name='contact'
      method='post'
      action='/'
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
                '=' +
                encodeURIComponent(data[key] ?? '')
            )
            .join('&')
        }
        await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: encode({
            'form-name': 'contact',
            ...data,
          }),
        })
        clearForm(setters)
        setIsSubmitted(true)
      }}
    >
      <input class='hidden' name='form-name' value='contact' />

      <div class='hidden'>
        Don't fill this out if you're human!
        <input
          class='hidden'
          name='botField'
          value={botField()}
          onInput={(e) => setBotField(e.currentTarget.value)}
        />
      </div>

      <div class='text-left child:w-full'>
        <label for='name' class='block py-1'>
          Name *
        </label>
        <input
          name='name'
          id='name'
          value={name()}
          onInput={(e) => setName(e.currentTarget.value)}
          required
        />
      </div>

      <div class='text-left child:w-full'>
        <label class='block py-1' for='email'>
          Email *
        </label>
        <input
          name='email'
          id='email'
          type='email'
          value={email()}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
      </div>

      <div class='text-left child:w-full'>
        <label class='block py-1' for='message'>
          Message *
        </label>
        <textarea
          name='message'
          id='message'
          value={message()}
          onInput={(e) => setMessage(e.currentTarget.value)}
          rows='5'
        ></textarea>
      </div>

      {
        <button
          type='submit'
          id='submitButton'
          disabled={isDisabled()}
          class={`${
            isDisabled() ? `opacity-50` : ``
          } p-2 rounded-xl bg-niceGreen text-lg text-mainBackground z-10 transition duration-300 ease-in-out`}
        >
          {isSubmitted() ? `Thanks for reaching out!` : `Submit`}
        </button>
      }
    </form>
  )
}
