import {
    Admin,
    Resource,
    ListGuesser,
    EditGuesser,
    ShowGuesser,
    Button,
    EditButton,
    TextInput,
    DateInput,
    SimpleForm,
    Show,
    List,
    Datagrid,
    TextField,
    DateField,
    ShowButton,
    ReferenceManyField,
    CustomRoutes,
    CreateButton,
    CreateView,
    Create,
    Link,
} from 'react-admin';
import { dataProvider } from './dataProvider';
import { ReferenceField } from 'react-admin';

const MyButton = ()=>{
    return <Button
                    label="Comment"
                    component={Link}
                    to="/comments/create"
                    resource='comments'
                    LinkComponent={Link}
                    />
}

const PostList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <ReferenceField source="userId" reference="users">
          <TextField source="name" />
        </ReferenceField>
        <MyButton/>
      </Datagrid>
    </List>
  );
};

const CommentList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name"/>
        <TextField source="email"/>
      </Datagrid>
    </List>
  );
};

const CreateComment = () => {
    return (
        <Create>
            <SimpleForm>
                <TextInput source='body'/>
                <TextInput source="name"/>
                <TextInput source="email"/>
            </SimpleForm>
        </Create>
    )
}

export const App = () => (
    <Admin
        dataProvider={dataProvider}
	>
        <Resource
            name="posts"
            list={PostList}
            create={()=><div>Create</div>}
            show={ShowGuesser}
            edit={EditGuesser}
        />
        <Resource
            name="comments"
            list={CommentList}
            edit={EditGuesser}
            show={ShowGuesser}
            create={CreateComment}
        />
        <ReferenceManyField
            reference='posts'
            target='usersId'>
                <Datagrid>
                    <TextField source='id' />
                    <TextField source='title' />
                    <TextField source='body' />
                </Datagrid>
        </ReferenceManyField>
    </Admin>
);

    