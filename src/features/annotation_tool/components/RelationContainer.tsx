import React from 'react'
import { useRelationContext } from '../context/useRelationContext';
import { Relation } from './Relation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RelationContainer = () => {
  const { relations } = useRelationContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      {relations.map((relation) => (
        <Relation key={relation.id} relation={relation} />
      ))}
      </CardContent>
    </Card>
  )
}
