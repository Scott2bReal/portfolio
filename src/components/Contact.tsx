import { Accessor, createMemo, createSignal, Setter } from "solid-js"

const isEmpty = (string: string) => {
  if (!string) return true
  if (string.length === 0) return true
  if (string.replace(/\s/, '').length === 0) return true
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

  const isFormComplete = (inputs: Accessor<string>[]) => {
    return inputs.some(input => isEmpty(input()))
  }

  const getters = [
    firstName,
    email,
    subject,
    message,
  ]
  const setters = [
    setFirstName,
    setLastName,
    setEmail,
    setSubject,
    setMessage,
    setBotField,
  ]

  const clearForm = (setters: Setter<string>[]) => {
    setters.forEach(setter => setter(''))
    return null
  }
  const active = createMemo(() => isFormComplete(getters))

  return (
    <form
      class='flex flex-col gap-2 md:w-[50vw] mx-auto p-2'
      data-netlify='true'
      netlify-honeypot='botField'
      name='contact'
      method='post'
      action='/success'
      onSubmit={() => {
        clearForm(setters)
      }}
    >
      <input class='hidden' name='form-name' value='contact' />

      <div class='hidden'>
        Don't fill this out if you're human!
        <input class='hidden' name='botField' value={botField()} onInput={(e) => setBotField(e.currentTarget.value)} />
      </div>

      <div class='flex gap-2 child:flex-grow'>
        <div class='text-left child:w-full'>
          <label class='block py-1'>First Name *</label>
          <input name='firstName' id='firstName' value={firstName()} onInput={(e) => setFirstName(e.currentTarget.value)} required />
        </div>
        <div class='text-left child:w-full'>
          <label class='block py-1'>Last Name</label>
          <input name='lastName' id='lastName' value={lastName()} onInput={(e) => setLastName(e.currentTarget.value)}/>
        </div>
      </div>

      <div class='text-left child:w-full'>
        <label class='block py-1' for='email'>
          Email *
        </label>
        <input name='email' id='email' type='email' value={email()} onInput={(e) => setEmail(e.currentTarget.value)} />
      </div>

      <div class='text-left child:w-full'>
        <label class='block py-1' for='subject'>
          Subject *
        </label>
        <input name='subject' id='subject' value={subject()} onInput={(e) => setSubject(e.currentTarget.value)}/>
      </div>

      <div class='text-left child:w-full'>
        <label class='block py-1' for='message'>
          Message *
        </label>
        <textarea name='message' id='message' value={message()} onInput={(e) => setMessage(e.currentTarget.value)} rows='5'></textarea>
      </div>

      <button
        type='submit'
        id='submitButton'
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        class={`${active() ? 'opacity-50' : ''} ${isClicked() ? 'scale-95' : ''} p-2 rounded-xl bg-niceGreen text-lg text-mainBackground z-10`}
      >
        Submit
      </button>

      <a href='/' class='text-niceBlue hover:opacity-50'>
        Back Home
      </a>
    </form>
  )
}
