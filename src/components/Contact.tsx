import { Accessor, createMemo, createSignal, onCleanup, Setter } from 'solid-js'

const isEmpty = (string: string) => {
  if (!string) return true
  if (string.trim().length === 0) return true
  return false
}

export default function Contact() {
  const [firstName, setFirstName] = createSignal('')
  const [lastName, setLastName] = createSignal('')
  const [email, setEmail] = createSignal('')
  const [subject, setSubject] = createSignal('')
  const [message, setMessage] = createSignal('')
  const [botField, setBotField] = createSignal('')
  const [isClicked, setIsClicked] = createSignal(false)
  const [isSubmitted, setIsSubmitted] = createSignal(false)

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
  const requiredGetters = [firstName, email, subject, message]
  const setters = [
    setFirstName,
    setLastName,
    setEmail,
    setSubject,
    setMessage,
    setBotField,
  ]
  const clearForm = (setters: Setter<string>[]) => {
    setters.forEach((setter) => setter(''))
    return null
  }
  const isActive = createMemo(() => isFormComplete(requiredGetters))
  onCleanup(() => {
    setIsSubmitted(false)
    clearForm(setters)
  })

  return (
    <form
      class='flex flex-col gap-2 md:w-[50vw] mx-auto p-2'
      data-netlify='true'
      netlify-honeypot='botField'
      name='contact'
      method='post'
      action='/success'
      onSubmit={async (e) => {
        e.preventDefault()
        const data = {
          firstName: firstName(),
          lastName: lastName(),
          email: email(),
          subject: subject(),
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
        await fetch('/contact', {
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

      <div class='flex gap-2 child:flex-grow'>
        <div class='text-left child:w-full'>
          <label class='block py-1'>First Name *</label>
          <input
            name='firstName'
            id='firstName'
            value={firstName()}
            onInput={(e) => setFirstName(e.currentTarget.value)}
            required
          />
        </div>
        <div class='text-left child:w-full'>
          <label class='block py-1'>Last Name</label>
          <input
            name='lastName'
            id='lastName'
            value={lastName()}
            onInput={(e) => setLastName(e.currentTarget.value)}
          />
        </div>
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
        <label class='block py-1' for='subject'>
          Subject *
        </label>
        <input
          name='subject'
          id='subject'
          value={subject()}
          onInput={(e) => setSubject(e.currentTarget.value)}
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

      {isActive() ? (
        <button
          type='submit'
          id='submitButton'
          onMouseDown={() => setIsClicked(true)}
          onMouseUp={() => setIsClicked(false)}
          class={`${isClicked() ? 'scale-95' : ''} p-2 rounded-xl bg-niceGreen text-lg text-mainBackground z-10`}
        >
          Submit
        </button>
      ) : (
        <button
          disabled
          class={`opacity-50 p-2 rounded-xl bg-niceGreen text-lg text-mainBackground z-10`}
        >
          {isSubmitted() ? 'Thanks for reaching out!' : 'Submit'}
        </button>
      )}

      <a href='/' class='text-niceBlue hover:opacity-50'>
        Back Home
      </a>
    </form>
  )
}
