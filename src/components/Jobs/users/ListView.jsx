import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./listview.module.scss"
import Button from './Button'
import users from '../../../extras/users'
const ListView = () => {
  return (
    <section className={styles.listviewWrapper}>
<article>
  <div className={styles.imgContainer}>
  <img src="https://dl.airtable.com/.attachmentThumbnails/89ba7458c24252be77f5a835dd398880/c13ef359"/>
  </div>
<div className='ps-1 pt-2'>
  <h4>name</h4>
  <h5 className={styles.price}>123</h5>
  <p>Lorem, ipsum.</p>
  <Link>
  {/* <Button>Details</Button> */}
  </Link>
</div>
</article>
  </section>
  )
}

export default ListView