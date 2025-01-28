import { useEffect, useState } from 'react'
import { NewConstraint, SchemaMention, SchemaRelation } from '../types/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { createSchema } from '../api/schemas'
import { useNavigate } from 'react-router'
import { Team } from '@/features/dashboard/types/types'
import { getTeams } from '@/features/projects/api/projects'
import { Checkbox, Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

const CreateSchemaPage = () => {
  const navigate = useNavigate()

  const generateRandomHexColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16)
    return `#${randomColor.padStart(6, '0')}`
  }

  const [mentions, setMentions] = useState<Omit<SchemaMention, 'id'>[]>([
    {
      tag: '',
      description: '',
      color: generateRandomHexColor(),
      entityPossible: false,
    },
  ])
  const [relations, setRelations] = useState<Omit<SchemaRelation, 'id'>[]>([
    {
      tag: '',
      description: '',
    },
  ])
  const [constraints, setConstraints] = useState<NewConstraint[]>([
    {
      mention_head_tag: '',
      relation_tag: '',
      mention_tail_tag: '',
      is_directed: false,
    },
  ])
  const [name, setName] = useState<string>('')
  const [team, setTeam] = useState<Team | undefined>(undefined)
  const [teams, setTeams] = useState<Team[]>([])

  // States for collapsed/expanded mentions and relations
  const [areMentionsCollapsed, setAreMentionsCollapsed] = useState(false)
  const [areRelationsCollapsed, setAreRelationsCollapsed] = useState(false)
  const [areConstraintsCollaped, setAreConstraintsCollapsed] = useState(false)

  useEffect(() => {
    const fetchTeams = async () => {
      setTeams(await getTeams())
    }
    fetchTeams()
  }, [])
  const handleAddMention = () => {
    setMentions((prev) => [
      ...prev,
      {
        tag: '',
        description: '',
        color: generateRandomHexColor(),
        entityPossible: false,
      },
    ])
  }

  const handleAddRelation = () => {
    setRelations((prev) => [...prev, { tag: '', description: '' }])
  }

  const handleMentionChange = (
    index: number,
    key: string,
    value: string | boolean
  ) => {
    setMentions((prev) =>
      prev.map((mention, i) =>
        i === index ? { ...mention, [key]: value } : mention
      )
    )
  }

  const handleRelationChange = (index: number, key: string, value: string) => {
    setRelations((prev) =>
      prev.map((relation, i) =>
        i === index ? { ...relation, [key]: value } : relation
      )
    )
  }

  const handleDeleteMention = (index: number) => {
    setMentions((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDeleteRelation = (index: number) => {
    setRelations((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddConstraint = () => {
    setConstraints((prev) => [
      ...prev,
      {
        mention_head_tag: '',
        relation_tag: '',
        mention_tail_tag: '',
        is_directed: false,
      },
    ])
  }

  const handleConstraintChange = (
    index: number,
    key: string,
    value: string | boolean
  ) => {
    setConstraints((prev) =>
      prev.map((constraint, i) =>
        i === index ? { ...constraint, [key]: value } : constraint
      )
    )
  }

  const handleDeleteConstraint = (index: number) => {
    setConstraints((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCreateSchema = async () => {
    if (team) {
      const createdSchema = await createSchema(
        team,
        name,
        mentions.filter((m) => m.tag),
        relations.filter((r) => r.tag),
        constraints.filter(
          (c) => c.mention_head_tag && c.mention_tail_tag && c.relation_tag
        )
      )
      navigate(`/dashboard/schemas/${createdSchema.id}`)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
          Create new Schema
        </h1>
      </div>

      <label className="block mt-4 text-gray-900 dark:text-gray-100">
        Schema Name
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <select
        id={`team`}
        value={team?.id}
        onChange={(e) =>
          setTeam(teams.find((t) => t.id === Number(e.target.value)))
        }
        className="form-control w-full border dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 rounded"
      >
        <option value="">Select Team</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
        <h2
          className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-pointer"
          onClick={() => setAreMentionsCollapsed(!areMentionsCollapsed)}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`mr-2 transition-transform duration-200 ${
              areMentionsCollapsed ? '' : 'rotate-90'
            }`}
          ></FontAwesomeIcon>
          Mentions
        </h2>
        {areMentionsCollapsed ? (
          mentions.filter((m) => m.tag).length ? (
            <div className="flex space-x-2">
              {mentions
                .filter((m) => m.tag)
                .map((mention, index) => (
                  <span
                    key={index}
                    className="text-gray-900 dark:text-gray-100 rounded-full py-1 px-3"
                    style={{ backgroundColor: mention.color }}
                  >
                    {mention.tag}
                  </span>
                ))}
            </div>
          ) : (
            <p className="text-gray-900 dark:text-gray-300">
              No mentions added yet.
            </p>
          )
        ) : (
          mentions.map((mention, index) => (
            <div
              key={index}
              className="mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-sm relative"
            >
              {index !== 0 && (
                <Button
                  onClick={() => handleDeleteMention(index)}
                  variant="link"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </Button>
              )}
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Mention {index + 1}
              </h3>
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
                <div className="form-group">
                  <Input
                    type="text"
                    value={mention.tag}
                    onChange={(e) =>
                      handleMentionChange(index, 'tag', e.target.value)
                    }
                    placeholder="Enter a tag"
                    label="Tag"
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    value={mention.description}
                    onChange={(e) =>
                      handleMentionChange(index, 'description', e.target.value)
                    }
                    placeholder="Enter a description"
                    label="Description"
                  />
                </div>
                <div className="flex items-center">
                  <Input
                    id={`color-${index}`}
                    type="color"
                    value={mention.color}
                    onChange={(e) =>
                      handleMentionChange(index, 'color', e.target.value)
                    }
                    className="w-6 h-6 rounded min-w-[1.5rem] dark:border-gray-600 bg-white dark:bg-gray-800 p-0"
                  />
                  <label
                    htmlFor={`color-${index}`}
                    className="ml-2 text-gray-900 dark:text-gray-100"
                  >
                    Color
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    checked={mention.entityPossible}
                    onChange={(e) =>
                      handleMentionChange(
                        index,
                        'entityPossible',
                        e.target.checked
                      )
                    }
                    label="Entity Possible"
                  />
                </div>
              </div>
            </div>
          ))
        )}
        {areMentionsCollapsed ? (
          <></>
        ) : (
          <div className="flex justify-end mt-4">
            <Button onClick={handleAddMention} variant="default">
              Add Mention
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
        <h2
          className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-pointer"
          onClick={() => setAreRelationsCollapsed(!areRelationsCollapsed)}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`mr-2 transition-transform duration-200 ${
              areRelationsCollapsed ? '' : 'rotate-90'
            }`}
          ></FontAwesomeIcon>
          Relations
        </h2>
        {areRelationsCollapsed ? (
          relations.filter((r) => r.tag).length ? (
            <div className="flex space-x-2">
              {relations
                .filter((r) => r.tag)
                .map((relation, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 rounded-full py-1 px-3"
                  >
                    {relation.tag}
                  </span>
                ))}
            </div>
          ) : (
            <p className="text-gray-900 dark:text-gray-300">
              {' '}
              No relations added yet.
            </p>
          )
        ) : (
          relations.map((relation, index) => (
            <div
              key={index}
              className="mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 rounded-lg shadow-sm relative"
            >
              {index !== 0 && (
                <Button
                  onClick={() => handleDeleteRelation(index)}
                  variant="link"
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </Button>
              )}
              <h3 className="text-lg font-semibold mb-2  text-gray-900 dark:text-gray-100">
                Relation {index + 1}
              </h3>
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
                <div className="form-group">
                  {/* Form group for Tag */}
                  <Input
                    type="text"
                    value={relation.tag}
                    onChange={(e) =>
                      handleRelationChange(index, 'tag', e.target.value)
                    }
                    placeholder="Enter a tag"
                    label="Tag"
                  />
                </div>
                {/* Form group for Description */}
                <div className="form-group">
                  <Input
                    type="text"
                    value={relation.description}
                    onChange={(e) =>
                      handleRelationChange(index, 'description', e.target.value)
                    }
                    placeholder="Enter a description"
                    label="Description"
                  />
                </div>
              </div>
            </div>
          ))
        )}
        {areRelationsCollapsed ? (
          <></>
        ) : (
          <div className="flex justify-end">
            <Button
              onClick={handleAddRelation}
              className="mt-4"
              variant="default"
            >
              Add Relation
            </Button>
          </div>
        )}
      </div>

      {/* Constraint Card */}
      <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
        <h2
          className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-pointer"
          onClick={() => setAreConstraintsCollapsed(!areConstraintsCollaped)}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className={`mr-2 transition-transform duration-200 ${
              areConstraintsCollaped ? '' : 'rotate-90'
            }`}
          ></FontAwesomeIcon>
          Constraints
        </h2>
        {areConstraintsCollaped ? (
          constraints.filter(
            (c) => c.mention_head_tag && c.mention_tail_tag && c.relation_tag
          ).length ? (
            <div className="flex flex-col space-x-2">
              {constraints
                .filter(
                  (c) =>
                    c.mention_head_tag && c.mention_tail_tag && c.relation_tag
                )
                .map((constraint, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 shadow"
                  >
                    {/* Mention Head Tag */}
                    <span className="text-gray-800dark:text-gray-100 font-medium">
                      {constraint.mention_head_tag}
                    </span>

                    {/* Relation Tag */}
                    <span className="text-gray-800dark:text-gray-100 font-semibold">
                      {constraint.relation_tag}
                    </span>

                    {/* Mention Tail Tag */}
                    <span className="text-gray-800dark:text-gray-100 font-medium">
                      {constraint.mention_tail_tag}
                    </span>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-900 dark:text-gray-300">
              No constrains added yet.
            </p>
          )
        ) : (
          constraints.map((constraint, index) => (
            <div
              key={index}
              className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 rounded-lg shadow-inner relative"
            >
              {index !== 0 && (
                <Button
                  onClick={() => handleDeleteConstraint(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  variant="link"
                >
                  Delete
                </Button>
              )}
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Constraint {index + 1}
              </h3>
              <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
                {/* Mention Head Tag */}
                <div className="form-group">
                  <label
                    htmlFor={`mention-head-${index}`}
                    className="form-label font-medium"
                  >
                    Mention Head Tag
                  </label>
                  <select
                    id={`mention-head-${index}`}
                    value={constraint.mention_head_tag}
                    onChange={(e) =>
                      handleConstraintChange(
                        index,
                        'mention_head_tag',
                        e.target.value
                      )
                    }
                    className="form-control w-full border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded"
                  >
                    <option value="">Select Mention Head</option>
                    {mentions.map((m, idx) => (
                      <option key={idx} value={m.tag}>
                        {m.tag}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Relation Tag */}
                <div className="form-group">
                  <label
                    htmlFor={`relation-tag-${index}`}
                    className="form-label font-medium text-gray-900 dark:text-gray-100"
                  >
                    Relation Tag
                  </label>
                  <select
                    id={`relation-tag-${index}`}
                    value={constraint.relation_tag}
                    onChange={(e) =>
                      handleConstraintChange(
                        index,
                        'relation_tag',
                        e.target.value
                      )
                    }
                    className="form-control w-full border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded"
                  >
                    <option value="">Select Relation Tag</option>
                    {relations.map((r, idx) => (
                      <option key={idx} value={r.tag}>
                        {r.tag}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Mention Tail Tag */}
                <div className="form-group">
                  <label
                    htmlFor={`mention-tail-${index}`}
                    className="form-label font-medium"
                  >
                    Mention Tail Tag
                  </label>
                  <select
                    id={`mention-tail-${index}`}
                    value={constraint.mention_tail_tag}
                    onChange={(e) =>
                      handleConstraintChange(
                        index,
                        'mention_tail_tag',
                        e.target.value
                      )
                    }
                    className="form-control w-full border dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded"
                  >
                    <option value="">Select Mention Tail</option>
                    {mentions.map((m, idx) => (
                      <option key={idx} value={m.tag}>
                        {m.tag}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Is Directed */}
                <div className="form-group">
                  <Checkbox
                    checked={constraint.is_directed}
                    onChange={(e) =>
                      handleConstraintChange(
                        index,
                        'is_directed',
                        e.target.checked
                      )
                    }
                    label="Is Directed"
                  />
                </div>
              </div>
            </div>
          ))
        )}
        {/* Add Constraint Button */}
        {areConstraintsCollaped ? (
          <></>
        ) : (
          <div className="flex justify-end">
            <Button
              onClick={handleAddConstraint}
              className="mt-4"
              variant="default"
            >
              Add Constraint
            </Button>
          </div>
        )}
      </div>

      <TooltipProvider>
        <Tooltip delayDuration={100} disableHoverableContent>
          <TooltipTrigger asChild>
            <div className="inline-block">
              <Button
                variant={
                  !team ||
                  !name ||
                  mentions.filter((m) => m.tag).length === 0 ||
                  relations.filter((r) => r.tag).length === 0
                    ? 'outline'
                    : 'default'
                }
                onClick={handleCreateSchema}
                disabled={
                  !team ||
                  !name ||
                  mentions.filter((m) => m.tag).length === 0 ||
                  relations.filter((r) => r.tag).length === 0
                }
              >
                Create Schema
              </Button>
            </div>
          </TooltipTrigger>
          {(!team ||
            !name ||
            mentions.filter((m) => m.tag).length === 0 ||
            relations.filter((r) => r.tag).length === 0) && (
            <TooltipContent side="top">
              Required fields are missing
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default CreateSchemaPage
