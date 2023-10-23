import { SocialEditor } from '@remirror/react-editors/social';

function App() {
  return (
    <div style={{ padding: 16 }}>
      <SocialEditor placeholder="Write a message" users={USERS} tags={TAGS} />
    </div>
  );
}

export default App;
