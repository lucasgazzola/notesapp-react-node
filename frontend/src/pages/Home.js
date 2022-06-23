import Header from '../components/Header';
import NotesList from '../components/NotesList';
import Modal from '../components/Modal';

export default function Home() {
  return (
    <div className="App">
      <Header />
      <Modal />
      <NotesList />
    </div>
  );
}